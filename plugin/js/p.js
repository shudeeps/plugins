/**
 * Created by User on 7/7/2017.
 */
$.fn.find_continent = function(options) {

var  ourdata=JSON.parse(options);
    //console.log(ourdata)


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




    $('body').append('<div id="result" style="display: none; width:200px;padding-top:20px; border: 1px #dadada solid;" >');
    var  continent_list=[];
    for(i=0;i<ourdata.length;i++){
    continent_list.push(ourdata[i].name);
              }

    var uni_continent=continent_list.unique();
     $('select').append('<option selected disabled>Choose country</option>');
    for(var i=0;i<uni_continent.length;i++){

       $('#result').append('<input id="cid'+uni_continent[i]+'" class="continent" name="'+uni_continent[i]+'" type="checkbox">'+uni_continent[i]+'<br>');

       $('#result').append('<div style="padding:10px" id="red'+uni_continent[i]+'">   </div>')

        find_country(uni_continent[i]);
        //console.log(uni_continent[i]);



     }

    function find_country(continent) {

        for (var i=0;i<ourdata.length;i++) {
          
            if (ourdata[i].name==continent) {
                     var cont=ourdata[i].name;
                 $('#red'+ourdata[i].name+'').append('<input value="'+cont+'"  id="'+ourdata[i].country_name+'" class="country"  type="checkbox">'+ourdata[i].country_name+'<br>');
                    
            }

        }


       
         }


    $('body').append('</div>');




    var selected_id=$(this).attr('id');

    $('#'+selected_id+'').on("click",function () {
        $("#result").toggle();

    });


      $('.country').on("click",function(){
        
       $('#result input[type="checkbox"]').siblings().prop("checked",false);
          var cont=$(this).attr('value');
           // console.log(cont)

            $('#cid'+cont+'').prop("checked",true);
            $(this).prop("checked",true);
            var $name=$(this).attr('id');
            $('#'+selected_id+' option').html($name);
            $('#result').css("display","none");

            });

      $('.continent').on("click",function(){

       var continent=$(this).attr('name');

    $('#result input[type="checkbox"]').siblings().prop("checked",false);
     $(this).prop("checked",true);
    $('#red'+continent+' :checkbox').prop("checked",true);
      })


}
