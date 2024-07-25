import Swal from "sweetalert2";

export class Alerts {
    alertCustomError(message: string) {
        Swal.fire({
          icon: "error",
          text: message,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#22D3F5",
        });
      }
      alertSuccess(message: string) {
        Swal.fire({
          icon: "success",
          text: message,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#22D3F5",
        });
      }
      
      alertWait(message: string) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: message,
        });
        Swal.showLoading();
      }
      alertWarning(message: string) {
        Swal.fire({
          icon: "warning",
          text: message,
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#22D3F5",
        });
      }
     alertDecision(message: string){
      Swal.fire({
        icon: 'warning',
        title: '¿Está seguro?',
        text: message,
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'OK'
      }).then((res) => {

      })
      }

      errorService(err:any){
        let error = ''
      if (err.error.descripcion != undefined) {
        error = err.error.descripcion
      } else if (err.error.description != undefined) {
        error = err.error.description
      } else if (err.error.message != undefined) {
        error = err.error.message
      }
      this.alertCustomError(error)
      }

      errorService2(err:any){
        let error = ''
      if (err.descripcion != undefined) {
        error = err.descripcion
      } else if (err.description != undefined) {
        error = err.description
      } else if (err.message != undefined) {
        error = err.message
      }
      this.alertCustomError(error)
      }

      
}