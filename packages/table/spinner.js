import Vue from 'vue'
import { Spinner } from 'vux'
const SpinnerFactory = Vue.extend(Spinner)

export default function spinner(el) {
    const spinnerWrapper = document.createElement('div')
    const spinnerInstance = new SpinnerFactory({
        propsData: {
            type: 'ios-small'
        }
    })
    el.appendChild(spinnerWrapper)
    spinnerInstance.$mount(spinnerWrapper)
}