mixin formatDate(dateString)
  -var date = new Date(dateString);
  -var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  -var d = date.getDate();
  -var m = monthNames[date.getMonth()];
  -var y = date.getFullYear();
  -var output = d + ' ' + m + ' ' + y;
  =output
