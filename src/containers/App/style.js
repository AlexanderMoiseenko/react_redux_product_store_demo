/* eslint-disable */
import styled from 'styled-components'
import {media} from '../../styles/styles_js/utils'
import {Dimmer, Container} from 'semantic-ui-react'

export const PageLayout = styled.div`height: 100%;`;

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  color: ${props => props.theme.primaryTextColor};
  background-color: ${props => props.theme.primaryColorText};
`;

export const MainContent = styled.main`
  display: flex;
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  ${media.md`
		padding-top: 65px;
	`};
  ${media.lg`
		padding-top: 72px;
	`};
`;

//  Margin - just to fill empty space
export const MainContainer = styled(Container)`
  margin-top: 2em;
  margin-bottom: 2em;

  &#main-container {
		${media.mdOnly`
			width: 100% !important;
		`}

		${media.smOnly`
		  width: 100% !important;
		`}
	}

	> .grid,
	> * > .grid {
		min-height: 100%;
	}
`;

export const StyledDimmer = styled(Dimmer)`
	z-index: 55!important;
	cursor: pointer;
`;
