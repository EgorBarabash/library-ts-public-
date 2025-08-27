export function useInput(props) {
    let { isDisabled, placeholder, type, className} = props

    return { isDisabled, placeholder, type, className};
}