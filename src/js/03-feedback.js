import storage from './storage'
import throttle from 'lodash.throttle'

const KEY = 'feedback-form-state'
const feedbackForm = document.querySelector('.feedback-form')

const handleOnInput = (event) => {
    const data = storage.load(KEY) || {}

    data[event.target.name] = event.target.value

    storage.save(KEY, data)
}

const handleLoadData = () => {
    const data = storage.load(KEY)
    if (data) {
        feedbackForm.email.value = data.email || ''
        feedbackForm.message.value = data.message || ''
    }
}

const handleOnSubmit = (event) => {
    event.preventDefault()
    console.log({
        email: feedbackForm.email.value,
        message: feedbackForm.message.value,
    })

    storage.save(KEY, '')
    event.currentTarget.reset()
}

window.addEventListener('load', handleLoadData)
feedbackForm.addEventListener('submit', handleOnSubmit)
feedbackForm.addEventListener('input', throttle(handleOnInput, 500))
