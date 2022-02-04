import Button from 'components/Button'


import scanImg from 'assets/scan.png'

import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.heroContainer}>
        
        <section className={styles.hero}>
          <h1>3D Model Creation Price Estimator</h1>
          <p>
            Create a pricing estimate for 3D Asset creation via a product image.
          </p>
          <Button href="/dash" asLink rounded>
            Get started
          </Button>
        </section>
      </main>
      <aside>
        <figure>
          <img src={scanImg} alt="levar" />
        </figure>
      </aside>
    </div>
  )
}

export default Home
