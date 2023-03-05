import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './App.css'
import ProjectItem from './ProjectItem/index'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const pageStatus = {
  loading: 'loading',
  sucess: 'sucess',
  fail: 'failure',
}

class App extends Component {
  state = {
    selectedItem: categoriesList[0].id,
    projectsData: [],
    pageStat: pageStatus.loading,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {selectedItem} = this.state
    this.setState({pageStat: pageStatus.loading})
    try {
      const url = `https://apis.ccbp.in/ps/projects?category=${selectedItem}`
      const response = await fetch(url)
      const data = await response.json()
      const camelData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({projectsData: camelData, pageStat: pageStatus.sucess})
    } catch {
      this.setState({pageStat: pageStatus.fail})
    }
  }

  onselectionChange = event => {
    this.setState(
      {pageStat: pageStatus.loading, selectedItem: event.target.value},
      this.getData,
    )
  }

  renderSuccessView = () => {
    const {projectsData, selectedItem} = this.state
    return (
      <div>
        <div className="select-item">
          <select
            className="drop-down"
            value={selectedItem}
            onChange={this.onselectionChange}
            id="my-select"
          >
            {categoriesList.map(each => (
              <option key={each.id} value={each.id}>
                {each.displayText}
              </option>
            ))}
          </select>
        </div>
        <ul className="project-items">
          {projectsData.map(each => (
            <ProjectItem data={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-button" onClick={this.getData} type="button">
        Retry
      </button>
    </div>
  )

  renderPage = () => {
    const {pageStat} = this.state
    switch (pageStat) {
      case pageStatus.loading:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#328af2" />
          </div>
        )
      case pageStatus.sucess:
        return this.renderSuccessView()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="loading-center">{this.renderPage()}</div>
      </div>
    )
  }
}

export default App
