import App, { Container } from 'next/app'
import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'

import Head from '../src/components/head'
import HeaderContainer from '../src/components/header/HeaderContainer'
import { loginSuccess, getProfile, loginError, getBadgeList } from '../src/actions/user'
import { getMajorList } from '../src/actions/project'
import stylesheet from '../src/styles/index.less'
import _postCard from '../src/components/common/postCard/_postCard.less'
import _peopleCard from '../src/components/common/peopleCard/_peopleCard.less'
import _updateCard from '../src/components/common/updateCard/_updateCard.less'
import _postUpdate from '../src/components/common/postUpdate/_postUpdate.less'
import _editCollaborator from '../src/components/common/editCollaborator/_editCollaborator.less'
import { Cookies } from 'react-cookie'
import Loading from '../src/components/common/loading/Loading'
import jwtDecode from 'jwt-decode'
import VerifyAccountContainer from '../src/components/verify/VerifyAccountContainer'
import ResetPasswordContainer from '../src/components/resetPassword/ResetPasswordContainer'
import { Router } from 'routes'
import { acceptShareLink } from '../src/actions/project';
const cookies = new Cookies()

class MyApp extends App {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: null,
      isVerify: false
    }
  }

  componentDidMount() {
    let inviteCode = ""
    //Check login 
    let isLoggedIn = cookies.get('token') ? true : false
    inviteCode = Router.router.query.inviteCode && Router.router.query.inviteCode
    if (inviteCode)
      cookies.set('inviteCode', inviteCode)
    if (isLoggedIn) {
      this.setState({
        isVerify: jwtDecode(cookies.get('token')).verified,
        isLoggedIn
      })
      this.props.reduxStore.dispatch(loginSuccess())
      this.props.reduxStore.dispatch(getProfile())
      this.props.reduxStore.dispatch(getBadgeList())
      this.props.reduxStore.dispatch(acceptShareLink({ inviteCode: cookies.get('inviteCode') }))
      this.props.reduxStore.dispatch(getMajorList())

    }
    else this.props.reduxStore.dispatch(loginError())
    this.setState({
      isLoggedIn
    })

  }
  renderComponent(isLoggedIn, isVerify) {
    const { Component, pageProps } = this.props

    if (isLoggedIn === null)
      return <Loading />
    else if (Router.query && Router.query.token && !Router.query.username)
      return <VerifyAccountContainer />

    else if (isLoggedIn === false && !isVerify)
      return <Component {...pageProps} />
    else if (isLoggedIn === true && !isVerify)
      return <VerifyAccountContainer />
    else if (isLoggedIn === true && isVerify)
      return <Component {...pageProps} />
  }

  render() {
    const { reduxStore, pageProps } = this.props
    const { isLoggedIn, isVerify } = this.state
    return (
      <Container>
        <Provider store={reduxStore}>
          <div style={{ height: "100%" }}>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  stylesheet +
                  _postCard +
                  _peopleCard +
                  _postUpdate +
                  _updateCard +
                  _editCollaborator
              }} />
            <Head />

            {
              isLoggedIn && <HeaderContainer {...pageProps} />
            }


            {
              this.renderComponent(isLoggedIn, isVerify)
            }


          </div>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)
