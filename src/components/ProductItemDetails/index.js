import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaRegStar} from 'react-icons/fa'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import Skill from '../Cart'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,

    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getProductData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(Url, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = this.getFormattedData(data.job_details)

      const updatedSimilarProductsData = data.similar_jobs.map(
        eachSimilarProduct => ({
          companyLogoUrl: eachSimilarProduct.company_logo_url,
          employmentType: eachSimilarProduct.employment_type,
          id: eachSimilarProduct.id,
          jobDescription: eachSimilarProduct.job_description,
          location: eachSimilarProduct.location,
          rating: eachSimilarProduct.rating,
          title: eachSimilarProduct.title,
        }),
      )

      this.setState({
        productData: updatedData,
        similarProductsData: updatedSimilarProductsData,

        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-failure-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
      />
      <h1 className="product-not-found-heading skill-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="product-not-found-heading skill-heading">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="button"
        id="button"
        onClick={this.getProductData}
      >
        Retry
      </button>
    </div>
  )

  renderProductDetailsView = () => {
    const {productData, similarProductsData} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
    } = productData
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="product-item-details-bg-container">
        <div className="product-item">
          <div className="link-item">
            <div className="image-container">
              <img
                className="company-logo-url"
                alt="job details company logo"
                src={companyLogoUrl}
              />
              <div className="title-container">
                <h1 className="title">{title}</h1>
                <div className="icon-container">
                  <FaRegStar className="star-icon" size="20" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="package-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="paragraph">{location}</p>
                <BsFillBagFill className="bag-icon" />
                <p className="paragraph">{employmentType}</p>
              </div>
              <p className="paragraph">{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <div className="description-visit-container">
              <h1 className="description-heading">Description</h1>
              <div className="visit-container">
                <a
                  href={companyWebsiteUrl}
                  target="__blank"
                  className="skill-heading"
                >
                  Visit
                </a>
                <BiLinkExternal className="skill-heading" />
              </div>
            </div>
            <p className="paragraph">{jobDescription}</p>
          </div>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skill-container-details">
            {skills.map(eachItem => (
              <Skill productDetails={eachItem} key={eachItem.name} />
            ))}
          </ul>
          <h1 className="skill-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="skill-heading">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="skill-heading">Similar jobs</h1>
        <ul>
          {similarProductsData.map(eachItem => (
            <SimilarProductItem key={eachItem.id} productDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="product-item-bg-container">
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </div>
    )
  }
}

export default ProductItemDetails
