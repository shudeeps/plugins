/**
 * Created by User on 7/7/2017.
 */
$.fn.find_continent = function(options) {
    console.log(options)
    var select_id=$(this).attr('id');
    var pname=options.parentName;
    var cname=options.childName;
       // console.log(pname);

    //console.log(param)

   // var pcountry_name=options.childName;

    $(this).after('<div id="qq'+select_id+'"></div><input data="'+select_id+'" id="submit'+select_id+'" type="submit"><br>');
     var  ourdata=JSON.parse(options.data);

    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };

    Array.prototype.unique = function() {
        var arr = [];
        for(var i = 0; i < this.length; i++) {
            if(!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    }
    // console.log(select_id);
        $('#qq'+select_id+'').append('<div id="result'+select_id+'" style="display:none; width:200px;padding-top:20px; border: 1px #dadada solid;" />');
        var  continent_list=[];
        for(i=0;i<ourdata.length;i++){

        continent_list.push(ourdata[i][pname]);
               }
     var uni_continent=continent_list.unique();
     $('#'+select_id+'').css({width:'200px',height:'40px'});
     $('#'+select_id+'').append('<option id="'+select_id+'useless" selected disabled>Choose country</option>');
     $('#'+select_id+'useless').hide();
    for(var i=0;i<uni_continent.length;i++){

       $('#result'+select_id+'').append('<input id="cid'+select_id+''+uni_continent[i]+'"  value="'+uni_continent[i]+'" class="continent'+select_id+'" name="'+uni_continent[i]+'" type="checkbox">'+uni_continent[i]+'<br>');

       $('#result'+select_id+'').append('<div style="padding:10px" id="red'+select_id+''+uni_continent[i]+'">   </div>');

        find_country(uni_continent[i]);
        //console.log(uni_continent[i]);
    }
    function find_country(continent) {
        for (var i=0;i<ourdata.length;i++) {
              if (ourdata[i][pname]==continent) {
                 var cont=ourdata[i][pname];
                 $('#red'+select_id+''+ourdata[i][pname]+'').append('<input value="'+cont+'"  id="'+ourdata[i][cname]+'" class="country'+select_id+'"  type="checkbox">'+ourdata[i][cname]+'<br>');
            }
        }
         }
    $('#'+select_id+'').on("click",function () {
       $('#result'+select_id+'').toggle();
    });


      $('.country'+select_id+'').on("click",function(){

          var cont=$(this).attr('value');
          var n= $('#red'+select_id+''+cont+' :checked').length;
           if(n==0){
              $('#cid'+select_id+''+cont+'').prop('checked', false);

          }else{
               $('#cid'+select_id+''+cont+'').prop('checked', true);
           }
                });


      $('.continent'+select_id+'').on("click",function(){
          var continent=$(this).attr('name');
          if ($(this).prop("checked")==true){
              $(this).prop("checked",true);
              $('#red'+select_id+''+continent+' :checkbox').prop("checked",true);
          }
          else {
              $('#red'+select_id+''+continent+' :checkbox').prop("checked",false);
          }
      });

      $('#submit'+select_id+'').on("click",function () {
          //alert($(this).attr('data'));
          var checkedVals = $('.country'+select_id+':checkbox:checked').map(function() {
              return this.id;
          }).get();
         $rdata=checkedVals.join(",");
         console.log($rdata);
      });

}
