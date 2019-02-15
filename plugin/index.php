<?php $data=include 'database/db.php';?>


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

<select id="choose" style="height: 30px; width: 200px;" >

</select>


</body>



<script>
    $( "#choose" ).find_continent(
         data='<?php echo $data; ?>'

    );

</script>

</html>