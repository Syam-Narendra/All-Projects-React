import './index.css'

const ProjectItem = props => {
  const {data} = props
  const {name, imageUrl} = data
  return (
    <li className="project-item">
      <img className="project-image" src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default ProjectItem
