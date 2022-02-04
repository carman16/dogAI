import { useCallback } from 'react'
import * as tmImage from '@teachablemachine/image'


export function useMLModel({ modelPath, metadataPath }) {
  // Load machine model and pick the best prediction out of 10 classes
  const predict = useCallback(async (image) => {
    const model = await tmImage.load(modelPath, metadataPath)
    const predictions = await model.predictTopK(image, 10)
    
    const highestPrediction = predictions.reduce(
      (prev, current) =>
        prev.probability > current.probability ? prev : current,
      0
    )

    return highestPrediction
  }, [],)

  // const predictionArray = useCallback(async (image) => {
  //   const model = await tmImage.load(modelPath, metadataPath)
  //   const predictions = await model.predictTopK(image, 10)

  //   return predictions
    
  // }, [],)



  return {
    predict
  }
 

}


// export const predictions = []


export function useList({ modelPath, metadataPath }) {
  // Load machine model and pick the best prediction out of 10 classes
  const predictlist = useCallback(async (image) => {
    const model = await tmImage.load(modelPath, metadataPath)
    const predictions = await model.predictTopK(image, 10)
    
   

    return predictions
  }, [],)

  // const predictionArray = useCallback(async (image) => {
  //   const model = await tmImage.load(modelPath, metadataPath)
  //   const predictions = await model.predictTopK(image, 10)

  //   return predictions
    
  // }, [],)



  return {
    predictlist
  

} }
