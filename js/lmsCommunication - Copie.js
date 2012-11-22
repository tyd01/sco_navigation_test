var scorm = pipwerks.SCORM;

$( document ).ready( init );

function init()
{
	scorm.version = "2004";
	
	connect();
	
	var learnerName = getValue( "cmi.learner_name" );
	
	$( "#Name" ).html( "Bonjour " + learnerName + " !!!" );
	
	$( "#goto1" ).click( goto1 );
	$( "#goto2" ).click( goto2 );
	$( "#goto3" ).click( goto3 );
	
	$( window ).unload( disconnect );
}

function goto1()
{
	if( getValue( "adl.nav.request_valid.choice.{target=page1}" ) == "true" )
	{
		setValue( 'adl.nav.request', '{target=page1}choice' );
		disconnect();
	}
	
	/* if( getValue( "adl.nav.request_valid.previous" ) == "true" )
	{
		setValue( 'adl.nav.request', 'previous' );
		disconnect();
	} */
}

function goto2()
{
	if( getValue( "adl.nav.request_valid.choice.{target=page2}" ) == "true" )
	{
		setValue( 'adl.nav.request', '{target=page2}choice' );
		disconnect();
	}
	
	/* if( getValue( "adl.nav.request_valid.continue" ) == "true" )
	{
		setValue( 'adl.nav.request', 'continue' );
		disconnect();
	} */
}

function goto3()
{
	/* if( getValue( "adl.nav.request_valid.choice.{target=page3}" ) == "true" )
	{
		setValue( 'adl.nav.request', '{target=page3}choice' );
		disconnect();
	} */
	
	if( getValue( "adl.nav.request_valid.continue" ) == "true" )
	{
		setValue( 'adl.nav.request', 'continue' );
		setValue( 'adl.nav.request', 'continue' );
		disconnect();
	}
}

function connect()
{
	if( !scorm.connection.isActive )
	{
		var isSuccess = scorm.init();				
		var msg = "Connexion : " + ( ( isSuccess )? "succès" : "échec" );
		log( msg, isSuccess );
	}
}

function disconnect()
{
	if( scorm.connection.isActive )
	{
		var isSuccess = scorm.quit();				
		var msg = "Déconnexion : " + ( ( isSuccess )? "succès" : "échec" );
		log( msg, isSuccess );
	}
}

function save()
{
	if( scorm.connection.isActive )
	{
		var isSuccess = scorm.save();				
		var msg = "Sauvegarde : " + ( ( isSuccess )? "succès" : "échec" );
		log( msg, isSuccess );
	}
}

function getValue( parameter )
{
	var value = null;
	
	if( scorm.connection.isActive )
	{
		value = scorm.get( parameter );
		var msg = "Get " + parameter + " : " + ( ( value )? value : "échec" );
		var	isSuccess = ( value )? true : false;
		log( msg, isSuccess );
	}
	
	return value;
}

function setValue( parameter, value )
{
	if( scorm.connection.isActive )
	{
		var isSuccess = scorm.set( parameter, value );
		var msg = "Set " + parameter + " = " + value + " : " + ( ( isSuccess )? "succès" : "échec" );
		log( msg, isSuccess );
	}
}

function log( msg, isSuccess )
{
	$( "#console" ).append( "<div style=\"color:" + ( ( isSuccess )? "blue" : "orangered" ) + ";\">" + msg + "</div>" );
}