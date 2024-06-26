// import './NavLink.scss';
import { NavLink as NavigationLink } from 'react-router-dom';
import PropTypes from 'prop-types';

NavLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  userStyle: PropTypes.object
}
export default function NavLink({
  to,
  children,
  userStyle = {}
}) {
  // configure target based on to property
  // ^/about$ -> _blank
  // ^/contact$ -> _self
  return (
    <NavigationLink
      to={to}
      className='NavLink'
      style={({ isActive, isPending, isTransitioning }) => {
        return {
          ...{
            fontWeight: isActive ? 'bold' : 'normal',
            color: isPending ? 'red' : 'blue',
            viewTransitionName: isTransitioning ? 'fade' : 'none',
            ...userStyle
          }
        }
      }}
    >
      {children}
    </NavigationLink>
  )
}