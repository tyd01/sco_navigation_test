var API;
var connectionIsActive = false;

$( document ).ready( init );

function init()
{
	$( window ).unload( disconnect );
	
	connect();
	
	$( "#Name" ).html( "Bonjour " + get( "cmi.learner_name" ) + " !!!" );
	
	get( "adl.nav.request_valid.choice.{target=page2}" );
}

function connect()
{
	API = pipwerks.SCORM.API.getHandle();
	
	if( API )
	{
		//init API communication
		if( API.Initialize("") == "true" )
		{
			log( "Iniatialisation API ok" );
			connectionIsActive = true;
		}
		else
		{
			var error = API.GetLastError();
			var errorString = API.GetErrorString( error );
			var diagnostic = API.GetDiagnostic( error );
			
			log( "Iniatialisation API erreur<br>" +
				"error = " + error + " -> " + errorString + "<br>" +
				"Diagnostic = " + diagnostic );
		}
	}
}

function disconnect()
{
	if( connectionIsActive )
	{	
		if( set( "cmi.exit", "normal" ) )
		{
			if( API.terminate("") == "true" )
			{
				log( "deconnection API ok" );
				connectionIsActive = false;
			}
			else
			{
				var error = API.GetLastError();
				var errorString = API.GetErrorString( error );
				var diagnostic = API.GetDiagnostic( error );
			
				log( "deconnection API erreur<br>" +
				"error = " + error + " -> " + errorString + "<br>" +
				"Diagnostic = " + diagnostic );
			}
		}
	}
	else
	{
		log( "erreur deconnection : la connection est deja inactive" );
	}
}

function get( parameter )
{
	var value = false;
	
	if( connectionIsActive )
	{
		var value = API.GetValue( parameter );
		
		if( value != "" )
		{
			log( "GetValue( " + parameter + " ) : " + value );
		}
		else
		{
			var error = API.GetLastError();
			
			if( error == "0" )
			{
				log( "GetValue( " + parameter + " ) : ''" );
			}
			else
			{
				var errorString = API.GetErrorString( error );
				var diagnostic = API.GetDiagnostic( error );
				
				value = false;
				
				log( "GetValue( " + parameter + " ) : erreur<br>" + 
					"error = " + error + " -> " + errorString + "<br>" +
					"Diagnostic = " + diagnostic );
			}
		}
	}
	else
	{
		log( "erreur get : la connection est inactive" );
	}
	
	return value;
}

function set( parameter, value )
{
	var success = false;
	
	if( connectionIsActive )
	{
		if( API.SetValue( parameter, value ) == "true" )
		{
			success = true;
			log( "SetValue( " + parameter + ", " + value + " ) : ok" );
		}
		else
		{
			var error = API.GetLastError();
			var errorString = API.GetErrorString( error );
			var diagnostic = API.GetDiagnostic( error );
			
			log( "SetValue( " + parameter + ", " + value + " ) : erreur<br>" +
			"error = " + error + " -> " + errorString + "<br>" +
			"Diagnostic = " + diagnostic );
		}
	}
	else
	{
		log( "erreur get : la connection est inactive" );
	}
	
	return success;
}

function commit()
{
	if( connectionIsActive )
	{
		if( API.Commit( "" ) == "true" )
		{
			log( "Commit( '' ) : ok" );
		}
		else
		{
			var error = API.GetLastError();
			var errorString = API.GetErrorString( error );
			var diagnostic = API.GetDiagnostic( error );
			
			log( "Commit( '' ) : erreur<br>" +
			"error = " + error + " -> " + errorString + "<br>" +
			"Diagnostic = " + diagnostic );
		}
	}
	else
	{
		log( "erreur commit : la connection est inactive" );
	}
}

function log( msg )
{
	$( "#console" ).prepend( "<p>" + msg + "</p>" );
}