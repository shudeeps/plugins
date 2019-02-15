<?php $data=include 'database/db.php';
//var_dump($data);
?>


<html>
<head>
    <meta charset="utf-8">
    <title>
        country
    </title>
</head>
<script src="js/jquery-3.2.1.js"></script>
<script src="js/p.js"></script>

<body>
<h2>select country</h2>

<select id="choose" >

</select>



<p>empty space</p>

<select id="test" >

</select>

<p>empty space</p>
<div style="padding: 20px"></div>
<select id="gg" >

</select>
</body>

<script>

    $( "#choose" ).find_continent({
        data: '<?php echo $data; ?>',
        parentName: 'name',
        childName: 'country_name'
    } );

    $( "#test" ).find_continent({
        data: '<?php echo $data; ?>',
        parentName: 'name',
        childName: 'country_name'
    } );

    $( "#gg" ).find_continent({
        data: '<?php echo $data; ?>',
        parentName: 'name',
        childName: 'country_name'
    } );
//    var select_id=$(this).attr('id');
//    $('#submit'+select_id+'').on("click",function () {
//        //alert($(this).attr('data'));
//        var checkedVals = $('.country'+select_id+':checkbox:checked').map(function() {
//            return this.id;
//        }).get();
//        $rdata=checkedVals.join(",");
//        console.log($rdata);
//    });

</script>

</html>