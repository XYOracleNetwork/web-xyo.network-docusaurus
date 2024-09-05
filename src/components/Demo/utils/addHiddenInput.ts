export const addHiddenInput = (form: HTMLFormElement, name: string, value: string) => {
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = name
  input.value = value
  form.append(input)
}
