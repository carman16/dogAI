import cx from 'clsx'
import logo from 'assets/logo.svg'
import styles from './Logo.module.css'


function LogoSVG() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="logo"
      src={logo}
    >
    
      
      <defs>
        <clipPath id="clip0">
          <rect
            width="256"
            height="493.876"
            fill="white"
            transform="translate(0 11.3274)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

function Logo({ className }) {
  return (
    <div className={cx(styles.logo, className)}>
      <h2>3D Model Pricing Estimator</h2>
      <LogoSVG />
    </div>
  )
}

export default Logo
