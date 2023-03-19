import {Component} from 'react'
import './index.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatus = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loader: 'LOADER',
}

class CowinDashboard extends Component {
  state = {activeapiStatus: apiStatus.initial, coWinData: {}}

  componentDidMount = () => {
    this.getcowindata()
  }

  getcowindata = async () => {
    this.setState({activeapiStatus: apiStatus.loader})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok === true) {
      const data = await response.json()
      const updatedata = {
        last7Daysvaccination: data.last_7_days_vaccination,
        vaccinationAge: data.vaccination_by_age,
        vaccinationGender: data.vaccination_by_gender,
      }
      this.setState({
        coWinData: updatedata,
        activeapiStatus: apiStatus.success,
      })
    }
    if (response.status === 404) {
      this.setState({activeapiStatus: apiStatus.failure})
    }
  }

  renderallViews = () => {
    const {activeapiStatus} = this.state
    switch (activeapiStatus) {
      case apiStatus.success:
        return this.renderView()
      case apiStatus.failure:
        return this.renderfailure()
      case apiStatus.loader:
        return this.renderLoader()

      default:
        return null
    }
  }

  renderView = () => {
    const {coWinData} = this.state
    const {last7Daysvaccination, vaccinationGender, vaccinationAge} = coWinData
    if (!last7Daysvaccination) {
      return null
    }
    return (
      <div className="dashboard-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="cowin-logo"
            alt="website logo"
          />
          <h1 className="logo-heading">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <VaccinationCoverage vaccineData={last7Daysvaccination} />
        <VaccinationByGender genderData={vaccinationGender} />
        <VaccinationByAge ageData={vaccinationAge} />
      </div>
    )
  }

  renderfailure = () => (
    <div className="failure-container">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          className="cowin-logo"
          alt="website logo"
        />
        <h1 className="logo-heading">Co-WIN</h1>
      </div>
      <h1 className="heading">CoWIN Vaccination in India</h1>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
        />
        <h1 className="failure-heading">Something went wrong</h1>
      </div>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    return <>{this.renderallViews()} </>
  }
}

export default CowinDashboard