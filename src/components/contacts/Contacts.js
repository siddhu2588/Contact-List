import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Contact from "./Contact";
import Description from "./description"
//import styles from "./contacts.scss"
import "./contacts.css"
import {
  selectAllContact,
  clearAllContact,
  deleteAllContact,
  showdisc
} from "../../actions/contactAction";

const Contacts = () => {
  const dispatch = useDispatch();
  const [selectAll, setSelectAll] = useState(false);
  const flag =  useSelector((state) => state.contact.searchflag);
  const contacts = useSelector((state) => state.contact.contacts);
  const searchedcontacts = useSelector((state) => state.contact.searchedcontacts);
  const selctedContcats = useSelector(
    (state) => state.contact.selectedContacts
  );

  useEffect(() => {
    if (selectAll) {
      dispatch(selectAllContact(contacts.map((contact) => contact.id)));
    } else {
      dispatch(clearAllContact());
    }
  }, [selectAll]);
 
  return (
   
    <div className="outerwrap">
      <div class="contacttable">
      {selctedContcats.length > 0 ? (
        <button
          className="btn btn-danger mb-3"
          onClick={() => dispatch(deleteAllContact())}
        >
          delete all
        </button>
      ) : null}
      <table /* className="table shadow" */>
        <thead>
          <tr>
            <th>
              <div className="custom-control custom-checkbox">
                <input
                  id="selectAll"
                  type="checkbox"
                  className="custom-control-input"
                  value={selectAll}
                  onClick={() => setSelectAll(!selectAll)}
                />
                <label
                  htmlFor="selectAll"
                  className="custom-control-label"
                ></label>
              </div>
            </th>
            <th>Name</th>
            <th>Company</th>
            <th>Edit</th>
            {/* <th>E-mail</th>
            <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {flag == false ? contacts.map((contact) => (
  
            <Contact contact={contact} key={contact.id} selectAll={selectAll}  
            />
          )):searchedcontacts.map(contact  => (
            contact && 
            <Contact contact={contact} selectAll={selectAll}  
            />
          ))
          }
         
        </tbody>
      </table>
    </div>
      <div class="desc">
      {
        contacts.map( (contact) =>{
        return(
        contact.disc &&  <Description contact={contact} key={contact.id}/> 
        )})
      } 
    </div>
</div>
  );
};

export default Contacts;
