/*import java.io.IOException;
import java.util.HashMap;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONObject;

import jxl.demo.XML;

public class sssss
{

    public static void main(String[] args)
    {
	
    }

	//ArrayList<HashMap<String,String>> listofaccounts - ew n
    
    
	*//**
	 * Convert Xml to HashMap
	 * @param xml
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 *//*
	public static HashMap<String,Object> convertXmlToHashMap(String xml) throws JsonParseException, JsonMappingException, IOException{
	    
	    JSONObject jObject = XML.toJSONObject(xml);
	    ObjectMapper mapper = new ObjectMapper();
	    mapper.enable(SerializationFeature.INDENT_OUTPUT);
	    
	    HashMap<String,Object> json = mapper.readValue(
	    		jObject.toString(), HashMap.class);
		return json;
	}
	
	

}
*/