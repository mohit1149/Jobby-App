import {Link} from 'react-router-dom'
import {FaRegStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
  } = productData

  return (
    <li className="product-item">
      <Link to={`/jobs/${id}`} className="link-item">
        <div>
          <div className="image-container">
            <img
              className="company-logo-url"
              alt="company logo"
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
          <h1 className="description-heading">Description</h1>
          <p className="paragraph">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default ProductCard
