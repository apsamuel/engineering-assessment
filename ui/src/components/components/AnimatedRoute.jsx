import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

AnimatedRoute.propTypes = {
  animate: PropTypes.object,
  transition: PropTypes.object,
  children: PropTypes.node
};

AnimatedRoute.defaultProps = {
  transition: {
    duration: 3,
    ease: 'easeInOut',
    times: [0, 0.5, 0.6, 1]
  },
  animate: {
    opacity: [0, 0.2, 0.8, 1]
  },
};
export default function AnimatedRoute({ children, animate, transition }) {

  useEffect(() => {
  })
  const location = useLocation();
  return (
    <AnimatePresence>
      <motion.div
        layout
        style={{
          display: 'flex',
          flexGrow: 1,
          minWidth: '100%',
        }}
        key={location.pathname}
        animate={animate}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
