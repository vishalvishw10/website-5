import React from 'react'
import DetailText from '~components/common/detail-text'
import SocialSharing from '~components/common/social-sharing'
import {
  getGroups,
  getTypeOfRates,
} from '~components/social-media-graphics/race/state'

import shareStyles from './share.module.scss'

const getStateSquareImageUrl = state =>
  `/images/race-dashboard/${state.childSlug.slug}-square.png`

const getLandingPageUrl = state =>
  `https://covidtracking.com/race/infection-and-mortality-rates/${state.childSlug.slug}`

const getSocialCardShareText = (typeOfRates, state, groups) => {
  const today = new Date()

  if (typeOfRates === 'no rates') {
    return `In ${state.name}, ${typeOfRates} information is still not reported for COVID-19 cases and deaths. Help us get better data by contacting health officials at https://covidtracking.com/race/get-better-data #RacialDataTracker`
  }
  if (typeOfRates === 'mortality rates') {
    return `In ${state.name}, as of ${today.toLocaleString('default', {
      month: 'long',
    })} ${today.getDate()}, ${
      groups.worstDeathsGroup
    } were most likely to have died from #COVID19. https://www.covidtracking.com/race/infection-and-mortality-rates/${
      state.childSlug.slug
    } #RacialDataTracker`
  }
  if (typeOfRates === 'infection rates') {
    return `In ${state.name}, as of ${today.toLocaleString('default', {
      month: 'long',
    })} ${today.getDate()}, ${
      groups.worstCasesGroup
    } had the highest risk of contracting #COVID19. Get the latest analysis: https://www.covidtracking.com/race/infection-and-mortality-rates/${
      state.childSlug.slug
    } #RacialDataTracker`
  }
  if (typeOfRates === 'infection and mortality rates') {
    if (groups.worstDeathsGroup === groups.worstCasesGroup) {
      return `In ${state.name}, as of ${today.toLocaleString('default', {
        month: 'long',
      })} ${today.getDate()}, ${
        groups.worstCasesGroup
      } had the highest risk of contracting #COVID19 and were most likely to have died. Get the latest analysis: https://www.covidtracking.com/race/infection-and-mortality-rates/${
        state.childSlug.slug
      } #RacialDataTracker`
    }
  }
  return `In ${state.name}, as of ${today.toLocaleString('default', {
    month: 'long',
  })} ${today.getDate()}, ${
    groups.worstCasesGroup
  } had the highest risk of contracting #COVID19. ${
    groups.worstDeathsGroup
  } were most likely to have died. Get the latest analysis: https://www.covidtracking.com/race/infection-and-mortality-rates/${
    state.childSlug.slug
  } #RacialDataTracker`
}

export default ({ state, stateRaceData, combinedStates }) => {
  if (state.name === '-- Select a state --') {
    return null
  }

  const typeOfRates = getTypeOfRates(stateRaceData, combinedStates)

  const groups = getGroups(stateRaceData)

  const socialCardShareText = getSocialCardShareText(typeOfRates, state, groups)

  return (
    <>
      <img
        src={`/images/race-dashboard/${state.childSlug.slug}.png`}
        alt={socialCardShareText}
        className={shareStyles.preview}
      />
      <p>{socialCardShareText}</p>
      <DetailText centered className={shareStyles.clickToShare}>
        Share this directly on social media or{' '}
        <a href={getStateSquareImageUrl(state)}>
          download a square image for Instagram
        </a>
        .
      </DetailText>
      <SocialSharing
        shares={['facebook', 'twitter', 'link']}
        className={shareStyles.socialSharing}
        url={getLandingPageUrl(state)}
        text={socialCardShareText}
        outlineOnly
      />
    </>
  )
}
