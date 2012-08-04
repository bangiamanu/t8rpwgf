package uk.tripbrush.model.travel;

import java.io.Serializable;
import java.util.List;
import uk.tripbrush.model.core.Location;
import uk.tripbrush.view.AttractionOpenView;


/** @author Hibernate CodeGenerator */
public class Attraction  implements Serializable {

    private int id;

    private String name;

    private String description;
    
    private String description_short;

    //private Address address;

    private Category category;

    private Location location;

    private String imageFileName;

    private String imageFileName_small;
    
    private String url;
    
    private String wikiurl;
    
    private String otherlinks;
    
    private String postcode;

    private List<AttractionOpenView> openingTimes; 
    
    private String address;
    
    private String phone;
    
    private int uniqueId;
    
    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    public String getDescription(int maxsize) {
        if (description.length()>maxsize) {
            return description.substring(0,maxsize)+"...";
        }
        return description;
    }


    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the category
     */
    public Category getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(Category category) {
        this.category = category;
    }
    /**
     * @return the location
     */
    public Location getLocation() {
        return location;
    }

    /**
     * @param location the location to set
     */
    public void setLocation(Location location) {
        this.location = location;
    }

    /**
     * @return the imageFileName
     */
    public String getImageFileName() {
        return imageFileName;
    }

    /**
     * @param imageFileName the imageFileName to set
     */
    public void setImageFileName(String imageFileName) {
        this.imageFileName = imageFileName;
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return the postcode
     */
    public String getPostcode() {
        return postcode;
    }

    /**
     * @param postcode the postcode to set
     */
    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    /**
     * @return the description_short
     */
    public String getDescription_short() {
        return description_short;
    }

    /**
     * @param description_short the description_short to set
     */
    public void setDescription_short(String description_short) {
        this.description_short = description_short;
    }

    /**
     * @return the imageFileName_small
     */
    public String getImageFileName_small() {
        return imageFileName_small;
    }

    /**
     * @param imageFileName_small the imageFileName_small to set
     */
    public void setImageFileName_small(String imageFileName_small) {
        this.imageFileName_small = imageFileName_small;
    }

    /**
     * @return the wikiurl
     */
    public String getWikiurl() {
        return wikiurl;
    }

    /**
     * @param wikiurl the wikiurl to set
     */
    public void setWikiurl(String wikiurl) {
        this.wikiurl = wikiurl;
    }

    /**
     * @return the otherlinks
     */
    public String getOtherlinks() {
        return otherlinks;
    }

    /**
     * @param otherlinks the otherlinks to set
     */
    public void setOtherlinks(String otherlinks) {
        this.otherlinks = otherlinks;
    }

    /**
     * @return the openingTimes
     */
    public List<AttractionOpenView> getOpeningTimes() {
        return openingTimes;
    }

    /**
     * @param openingTimes the openingTimes to set
     */
    public void setOpeningTimes(List<AttractionOpenView> openingTimes) {
        this.openingTimes = openingTimes;
    }

    /**
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return the phone
     */
    public String getPhone() {
        return phone;
    }

    /**
     * @param phone the phone to set
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * @return the uniqueId
     */
    public int getUniqueId() {
        return uniqueId;
    }

    /**
     * @param uniqueId the uniqueId to set
     */
    public void setUniqueId(int uniqueId) {
        this.uniqueId = uniqueId;
    }


}
