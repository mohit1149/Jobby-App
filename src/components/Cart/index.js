import './index.css'

const Skill = props => {
  const {productDetails} = props
  const {imageUrl, name} = productDetails

  return (
    <li className="skill-bg-container">
      <img src={imageUrl} alt={name} />
      <p className="skill-heading">{name}</p>
    </li>
  )
}

export default Skill
