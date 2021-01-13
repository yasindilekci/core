package com.dotcms.rendering.velocity.viewtools;
import java.util.Date;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.naming.Context;
import javax.naming.InitialContext;

import org.apache.velocity.tools.view.tools.ViewTool;
import com.dotmarketing.util.Config;
import com.dotmarketing.util.Logger;

/**
 * Simple Email Sender ViewTool for DotCMS
 * 
 * @author Christopher Falzone <cfalzone@edinboro.edu>
 * @author Jason Tesser
 * @version 1.9.1
 */
public class MailerTool implements ViewTool {

	/**
	 * Sends an email
	 * 
	 * Example:  #set($error = $mailer.sendEmail(
	 *                   'them@theirdomain.com',
	 *                   'you@yourdomain.com',
	 *                   'The Subject',
	 *                   'The Message',
	 *                   false))
	 *           #if($UtilMethods.isSet($error))
	 *             ## Custom Error Handling 
	 *           #else
	 *             <p> Your message was sent </p>
	 *           #end
	 * 
	 * @param to		email address to send to
	 * @param from		email address to send from
	 * @param subject	subject of the email
	 * @param message	the message to send
	 * @param html		Whether or not to send it in HTML 
	 * @return			Empty if Successful, or the error message otherwise
	 */
	public String sendEmail(String to, String from, String subject,
			String message, Boolean html) {
		Session session = null;
		Context ctx = null;
		try {
			ctx = (Context) new InitialContext().lookup("java:comp/env");
			session = (javax.mail.Session) ctx.lookup("mail/MailSession");
		} catch (Exception e1) {
			try {
				Logger.debug(this, "Using the jndi intitialContext().");
				ctx = new InitialContext();
				session = (javax.mail.Session) ctx.lookup("mail/MailSession");
			} catch (Exception e) {
				Logger.error(this, "Exception occured finding a mailSession in JNDI context.");
				Logger.error(this, e1.getMessage(), e1);

			}

		}
		if (session == null) {

			return "Unable to Send Message: no session";
		}

		/* Create a new message */
		Message msg = new MimeMessage(session);

		/* Set To and From Address */
		try {
			msg.setFrom(new InternetAddress(from));
			msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(
					to, false));
		} catch (Exception e) {
			Logger.error(this, "Error Assigning To and From Addresses", e);
			return "Invalid To and/or From Address: " + e.getMessage();
		}
		try {
			msg.setSubject(subject);
		} catch (Exception e) {
			Logger.error(this, "Error Assigning Subject", e);
			return "Invalid Subject: " + e.getMessage();
		}

		
		
		final String velocityMailerMimeType = Config.getStringProperty("VELOCITY_MAILTOOL_MIME_TYPE", "text/html; charset=UTF-8");
		
		/* See if using HTML or not */
		if (html) {
			/* Set the HTML Message */
			try {
				msg.setContent(message, velocityMailerMimeType);
			} catch (Exception e) {
				Logger.error(this, "Error Setting Content", e);
				return "Invalid Message: " + e.getMessage();
			}
		} else {
			/* Set the TEXT message */
			try {
				msg.setText(message);
			} catch (Exception e) {
				Logger.error(this, "Error Assigning Text", e);
				return "Invalid Message: " + e.getMessage();
			}
		}

		/* Send the email */
		try {
			/* Some Headers */
			msg.setHeader("X-Mailer", "DotCMSSimpleMailer");
			msg.setSentDate(new Date());

			/* Open the transport and send the message */
			Transport transport = session.getTransport();
			transport.connect();
			transport.sendMessage(msg, msg
					.getRecipients(Message.RecipientType.TO));
			transport.close();
		} catch (Exception e) {
			Logger.error(this, "Error Sending Message", e);
			return "Unable to Send Message: " + e.getMessage();
		}

		/*
		 * At this point if there are no exceptions 
		 * I am assuming the email was sent
		 */
		return "";
	}

	/**
	 * Init Method for the viewtool
	 */
	public void init(Object obj) {

	}
}
