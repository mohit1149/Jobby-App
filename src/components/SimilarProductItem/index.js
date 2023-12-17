import {FaRegStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
  } = productDetails

  return (
    <li className="product-item similar-product-details">
      <div className="link-item">
        <div className="image-container">
          <img
            className="company-logo-url"
            alt="similar job company logo"
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
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-heading">Description</h1>
        <p className="paragraph">{jobDescription}</p>
      </div>
    </li>
  )
}

export default SimilarProductItem
