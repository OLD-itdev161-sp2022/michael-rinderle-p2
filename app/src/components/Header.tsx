import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Outer = styled.header`
    text-align: center;
    background: #696969;
    margin-bottom: 1.45rem;
`

const Inner = styled.div`
    margin: 0px auto;
    max-width: 960px;
    padding: 1.45rem 1.0875rem;
`;

const H1 = styled.h1`
    margin: 0px;
`

const Header = ({ siteTitle }:any) => (
    <Outer>  
        <Inner>
            <H1>
                { siteTitle }  
            </H1>
        </Inner>
    </Outer>
)

Header.propTypes = { siteTitle: PropTypes.string }

Header.defaultProps = { siteTitle: ``,}

export default Header