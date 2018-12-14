export const validate = (value) => {
    const {firstName, secondName, uploadFile} = value;
    const errors = {
      firstName: '',
      secondName: '',
      uploadFile: ''
    };
    !firstName? errors.firstName = 'Podaj imię!' : 
      firstName.length < 3? errors.firstName = 'Imię musi składać z co najmniej 3 liter' : errors.firstName = '';
    
    !secondName? errors.secondName = 'Podaj nazwisko!' : 
    secondName.length < 3? errors.secondName = 'Nazwisko musi składać z co najmniej 3 liter' : errors.secondName = '';
  
    !uploadFile? errors.uploadFile = 'Wybierz plik!' : 
      uploadFile.length === 0? errors.uploadFile = 'Wybierz plik!' : errors.uploadFile = '';
  
    return errors;
}