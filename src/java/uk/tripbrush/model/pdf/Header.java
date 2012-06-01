/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package uk.tripbrush.model.pdf;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 *
 * @author user
 */
public class Header extends PdfPageEventHelper {

    private String title;
    private boolean firstPage;

    public Header(String title) {
        this(title,false);
    }
    
    public Header(String title,boolean fpage) {
        this.title = title;
        firstPage = fpage;
    }

    public void onEndPage(PdfWriter writer, Document document) {
        Rectangle rect = writer.getBoxSize("art");
        if (!firstPage) {
            PdfContentByte cb = writer.getDirectContent();
            cb.setLineWidth(1);
            cb.moveTo(rect.getLeft(), rect.getTop() + 15);
            cb.lineTo(rect.getRight(), rect.getTop() + 15);
            cb.stroke();
            cb.moveTo(rect.getLeft(), rect.getTop() - 5);
            cb.lineTo(rect.getRight(), rect.getTop() - 5);
            cb.setLineWidth(PDFFormat.THICK_WIDTH);
            cb.stroke();

            Phrase header = new Phrase(title);
            ColumnText.showTextAligned(writer.getDirectContent(),
                    Element.ALIGN_CENTER, header,
                    (rect.getLeft() + rect.getRight()) / 2, rect.getTop(), 0);            
        }
    }
}
