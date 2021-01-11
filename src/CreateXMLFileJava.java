import java.io.File;
import java.io.IOException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Attr;
import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.DocumentType;
import org.w3c.dom.Element;

public class CreateXMLFileJava
{
    public static final String xmlFilePath = "E:\\xmlfile.xml";
    
    public static void main(String argv[]) throws IOException {
 
        try {
 
            DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
 
            DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
 
            Document document = documentBuilder.newDocument();
            
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
            transformer.setOutputProperty(OutputKeys.METHOD, "xml");
            DOMImplementation domImpl = document.getImplementation();
            
            DocumentType doctype = domImpl.createDocumentType("doctype",
        	    "-//J8583//DTD CONFIG 1.0//EN",
        	    "http://j8583.sourceforge.net/j8583.dtd");
            
            transformer.setOutputProperty(OutputKeys.DOCTYPE_PUBLIC, doctype.getPublicId());
            transformer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM, doctype.getSystemId());
        	
 
            // root element
            Element root = document.createElement("j8583-config");
            document.appendChild(root);
 
            // employee element
            Element employee = document.createElement("template");
 
            root.appendChild(employee);
 
            // set an attribute to staff element
            Attr attr = document.createAttribute("type");
            attr.setValue("0200");
            employee.setAttributeNode(attr);
 
            //you can also use staff.setAttribute("id", "1") for this
 
            // firstname element
            Element firstName = document.createElement("field");
          // firstName.appendChild(document.createTextNode("James"));
            employee.appendChild(firstName);
            
            attr = document.createAttribute("num");
            attr.setValue("3");
            firstName.setAttributeNode(attr);
            
            attr = document.createAttribute("type");
            attr.setValue("NUMERIC");
            firstName.setAttributeNode(attr);
            
            attr = document.createAttribute("length");
            attr.setValue("6");
            firstName.setAttributeNode(attr);
            
            firstName.appendChild(document.createTextNode("650000"));
            
            // <field num="3" type="NUMERIC" length="6">650000</field>
            
 
            // lastname element
           // Element lastname = document.createElement("lastname");
           // lastname.appendChild(document.createTextNode("Harley"));
           // employee.appendChild(lastname);
 
            // email element
          //  Element email = document.createElement("email");
          //  email.appendChild(document.createTextNode("james@example.org"));
          //  employee.appendChild(email);
 
            // department elements
         //   Element department = document.createElement("department");
         //   department.appendChild(document.createTextNode("Human Resources"));
         //   employee.appendChild(department);
 
            // create the xml file
            //transform the DOM Object to an XML File
            //TransformerFactory transformerFactory = TransformerFactory.newInstance();
           // Transformer transformer = transformerFactory.newTransformer();
            DOMSource domSource = new DOMSource(document);
            
            File file = new File(xmlFilePath);
            if(!file.exists())
        	file.createNewFile();
            
            StreamResult streamResult = new StreamResult(new File(xmlFilePath));
 
            // If you use
            // StreamResult result = new StreamResult(System.out);
            // the output will be pushed to the standard output ...
            // You can use that for debugging 
 
            transformer.transform(domSource, streamResult);
 
            System.out.println("Done creating XML File");
 
        } catch (ParserConfigurationException pce) {
            pce.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        }
    }
}
