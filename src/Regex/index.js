const emailRegex =
  /^[a-zA-Z]+([.-]?[a-zA-Z0-9]+)*@([a-zA-Z.-]+([.-]?[a-zA-Z]))[.]{1}[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[$@$!%*?&.])(?=.*?[^\w\s]).{8,}$/;
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

export { emailRegex, passwordRegex, nameRegex };
