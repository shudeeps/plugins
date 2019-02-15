/**
 * Created by User on 7/7/2017.
 */
$.fn.find_continent = function(options) {
   // this.css( "color", "green" );

    $.ajax({
        url:options.url,
        type:options.requestType,
        datatype:options.dataType,
        success:function (data) {

            var ourdata = JSON.parse(data);
            console.log(data);
            var select_id=$(this).attr('id');


            $('body').append('<div id="result">');

            for(i=0;i<ourdata.length;i++){

                $('#result').append('<input class="c'+ourdata[i].name+'" type="checkbox">'+ourdata[i].country_name+'<br>');

            }

            $('body').append('</div>');
           // console.log(ourdata);

            // for(var i=0;i<ourdata.length;i++){
            //     var id=ourdata[i].continent_id;
            //     var continent=ourdata[i].name;
            //     $('select').append('<input type="checkbox" id="result'+id+'" class="continent">'+continent+'</input><br>');
            //     // $('select').append('<div  id="result'+id+'" style="padding: 10px; "></div>');
            //             }

            // $.each(ourdata,function (key,value) {
            //     //console.log(key,value);
            //
            // })


          // //  $('select').append('<div id="data">');
          //  for (var i = 0; i < ourdata.length; i++) {
          //
          //       // var cid=ourdata[i].continent_id;
          //       //       console.log(cid);
          //       //  var continent=ourdata[i].name;
          //       //      console.log(continent);
          //
          //     var continent=ourdata[i].country_name;
          //      var country=ourdata[i].name;
          //      console.log(continent);
          //     console.log(country);
          //       //$('select').append('<option id="'+id+'" > '+continent+'</option>');
            //       // $('select').append('<option id="c'+id+'">');
          //       // $('#c'+id+'').append('<input type="checkbox" class="continent">'+continent+'<br>')
          //       // $('#c'+id+'').append('<input type="checkbox" class="country" id="'+id+'"> '+country+'<br>');
          //       // $('select').append('</option>');
          //               }
            //$('select').append('</div>');
        }
    });


};