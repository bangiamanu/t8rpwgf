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
import com.itextpdf.text.pdf.PdfPageEventHelper;
import com.itextpdf.text.pdf.PdfWriter;

/**
 *
 * @author user
 */
public class Footer extends PdfPageEventHelper {

    private int currentPage;

    public Footer() {
        currentPage = 0;
    }

    public void onEndPage(PdfWriter writer, Document document) {
        Rectangle rect = writer.getBoxSize("art");
        String page = getPageNum();
        if (currentPage>0) {
            ColumnText.showTextAligned(writer.getDirectContent(),
                    Element.ALIGN_CENTER, new Phrase(),
                    (rect.getLeft() + rect.getRight()) / 2, rect.getBottom(), 0);
        }
    }

    private String getPageNum() {
        int newPage = currentPage++;
        return "" + newPage;
    }

    /**
     * @return the currentPage
     */
    public int getCurrentPage() {
        return currentPage;
    }

    /**
     * @param currentPage the currentPage to set
     */
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
