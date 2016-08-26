import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'
export const HeaderIndex = () => (
  <div>
    <nav className='navbar navbar-default'>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <IndexLink to='/' className='navbar-brand' activeClassName={classes.activeRoute}>
            docker Swarm
          </IndexLink>
        </div>
        <div className='collapse navbar-collapse'>
          <ul className='nav navbar-nav'>
            <li>
              <Link to='/nodes' activeClassName={classes.activeRoute}>
                nodes
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
)

export default HeaderIndex
