

import Alert from 'components/Alert/'
import ProgressBar from 'components/ProgressBar'
// import { predictions } from 'hook/useMLModel'

import styles from './PredictionResult.module.css'

// console.log(predictions)

function PredictionResult({ prediction }) {
  const precision = (prediction.probability * 100).toFixed(2)
 

  return prediction.probability > 0.6 ? (
    <article className={styles.predictions}>
      <h2 className={styles.heading}>
        {prediction.className.replace(/(_)/gi, ' ')}
      </h2>

      <h4 className={styles.subheading}>
        {prediction.className === 'wild dog' ? (
          'Canid'
        ) : (
          <>
           
            Price Range Per Model
          </>
        )}
      </h4>

      <h5>Precision</h5>
      <ProgressBar min="0" max="100" value={precision}>
        {precision.replace('.', ',')} %
      </ProgressBar>
          <br/>
            
     <h4 className={styles.subheading}>
        {prediction.className !== prediction ? (
          <>
        Other    
        
          </>
        ) : (
          prediction.map(({ className, probability}) => (
            <> {className} {probability} biss </>
          ))
        )}
      </h4>
          
      
      
    
  
      
    </article>
  )

 
  : (
    <Alert type="warning">
      Rough Estimate Only
    </Alert>
  )
}




// function otherClasses

export default PredictionResult
