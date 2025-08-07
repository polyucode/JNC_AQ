import Swal from "sweetalert2";

export function preguntarParaEliminar(){
    return Swal.fire({
        title: "¿Confirma que desea eliminar?",
        showDenyButton: true,
        // showCancelButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          return true;
        } else if (result.isDenied) {
          return false;
        }
      });
}

// export function preguntarParaEliminar(){
//     return new Swal({
//         title: "Are you sure?",
//         text: "You will not be able to recover this imaginary file!",
//         icon: "warning",
//         buttons: [
//           'No, cancel it!',
//           'Yes, I am sure!'
//         ],
//         dangerMode: true,
//       }).then(function(isConfirm) {
//         if (isConfirm) {
//           new Swal({
//             title: 'Shortlisted!',
//             text: 'Candidates are successfully shortlisted!',
//             icon: 'success'
//           }).then(function() {
//             // form.submit();
//           });
//         } else {
//           new Swal("Cancelled", "Your imaginary file is safe :)", "error");
//         }
//       });
// }