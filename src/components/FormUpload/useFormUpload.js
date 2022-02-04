import { useCallback, useState } from 'react'

import { useMLModel, useList } from 'hook/useMLModel'
import { useFetch } from 'hook/useFetch'

export function useFormUpload() {
  const [file, setFile] = useState([])
  const [prediction, setPrediction] = useState([])
  const [predictions, setPredictions] = useState([])
  const [description, setDescription] = useState({})
  const [error, setError] = useState(null)

  const statusType = {
    IDLE: 'IDLE',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED',
  }

  const [status, setStatus] = useState(statusType.IDLE)

  const { predict } = useMLModel({
    modelPath: './model/model.json',
    metadataPath: './model/metadata.json',
  })

  const { predictlist } = useList({
    modelPath: './model/model.json',
    metadataPath: './model/metadata.json',
  })

  const { retrieve } = useFetch()

  const handleAll = useCallback(async () => {
    setPredictions(predictions)

  })

  console.log(prediction)
 


  const handleResults = useCallback(async (data) => {
    setPrediction(data)

    let breed = data.className.replace(/(_)/gi, ' ')
    if (breed === 'wild dog') {
      breed = 'Canidae'
    }

    const wikipediaApiUrl = encodeURI(
      `${process.env.REACT_APP_WIKIPEDIA_ENDPOINT}${breed}`
    )

    const wikipediaPages = await retrieve(wikipediaApiUrl)

    if (wikipediaPages.query) {
      const pageDescription = wikipediaPages.query.pages.find(
        (page) =>
          page.title.toLowerCase().includes(breed.toLowerCase()) &&
          page.extract.search(/(\bdog\b|canid|breed)/g) !== -1
      )

      const filteredDesc = pageDescription.extract
        ? pageDescription.extract
        : wikipediaPages.query.pages[0].extract

      setDescription({
        desc: `${filteredDesc.substring(0, 400 - 10)}...`,
        wikiUrl: `${process.env.REACT_APP_WIKIPEDIA_WIKI}/${breed}`,
      })
    } else {
      setDescription({
        desc: 'No wikipedia found.',
        wikiUrl: '',
        error: true,
      })
    }
  }, [])

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const [single] = acceptedFiles
      setFile(
        Object.assign(single, {
          preview: URL.createObjectURL(single),
        })
      )

      const image = document.getElementById('image')
      const mlPrediction = await predict(image)
      const mlPredictions = await predictlist(image)

      await handleResults(mlPrediction)
      await handleAll(mlPredictions)
    } catch (err) {
      setError(err)
      setStatus(statusType.REJECTED)
    } finally {
      setStatus(statusType.FULFILLED)
    }
  }, [])

  return {
    onDrop,
    file,
    prediction,
    predictions,
    description,
    error,
    isLoading: status === statusType.IDLE,
    isFinished: status === statusType.FULFILLED,
    isRejected: status === statusType.REJECTED,
  }
}

