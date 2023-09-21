import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { connect, ConnectedProps } from "react-redux"; // Updated import for connect
import { useNavigate } from "react-router-dom";

import { fetchData } from "../../actions";
import { Scrollbars } from "react-custom-scrollbars";
import { RootState } from "../../store"; // Import RootState for Redux state typing
import { ContactDetailState } from "../../types";

type MainComponentProps = ConnectedProps<typeof connector>;

function MainComponent({ data, loading, page, fetchData }: MainComponentProps) {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isUSOption, setIsUSOption] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [contactData, setContactData] = useState<ContactDetailState | null>(
    null
  );

  const scrollbarRef = useRef<Scrollbars | null>(null);
  const mainModalRef = useRef<any>(null);

  const loadMoreData = () => {
    if (!loading) {
      // Simulate an API call to fetch more data
      setTimeout(() => {
        getData(inputValue, isUSOption, true);
      }, 1000); // Simulate loading delay
    }
  };

  const debounce = <F extends (...args: any[]) => void>(
    func: F,
    delay: number
  ) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handle the debounced search term change
  const handleDebouncedSearch = debounce(async (str) => {
    getData(str, isUSOption, false);
  }, 500); // Adjust the delay as needed

  // Function to handle input value changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleDebouncedSearch(event.target.value);
  };

  // Function to handle the "Enter" key press
  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getData(inputValue, isUSOption, false);
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const getData = (name: string, type: boolean, isAdd: boolean) => {
    setIsUSOption(type);
    fetchData({
      cId: type ? "226" : "",
      name,
      page: isAdd ? page + 1 : 1,
      isAdd: isAdd,
    });
  };

  const onClickAllData = () => {
    getData(inputValue, false, false);
    navigate("/all");
  };

  const onClickUSData = () => {
    getData(inputValue, true, false);
    navigate("/us");
  };

  const onClickItem = (id: string) => {
    setContactData(data.contacts[Number(id)]);
  };

  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <button
            className="btn btn-primary btn-lg btn-block mb-2 color-a"
            data-toggle="modal"
            data-target="#modalCenter"
            onClick={() => onClickAllData()}
          >
            All Contacts
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-primary btn-lg btn-block mb-2 color-b"
            data-toggle="modal"
            data-target="#modalCenter"
            onClick={() => onClickUSData()}
          >
            US Contacts
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <label>
          <input
            type="checkbox"
            checked={isChecked} // Set the checked state based on the state variable
            onChange={handleCheckboxChange} // Handle changes to the checkbox
          />
          &nbsp;Only even
        </label>
      </div>

      <div
        ref={mainModalRef}
        className="modal fade"
        id="modalCenter"
        role="dialog"
        aria-labelledby="modalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {isUSOption ? "US Contacts" : "All Contacts"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label>
                Search:&nbsp;
                <input
                  type="text"
                  value={inputValue} // Set the input value based on the state variable
                  onChange={handleInputChange} // Handle changes to the input value
                  onKeyDown={handleEnterKeyPress}
                />
              </label>
              <br />
              <Scrollbars
                ref={(ref) => (scrollbarRef.current = ref)}
                style={{ width: 400, height: 300 }}
                onScrollFrame={(values) => {
                  if (values.top >= 1) {
                    loadMoreData();
                  }
                }}
              >
                <ul className="list-group">
                  {data.contacts_ids
                    .filter((con) => !(isChecked && Number(con) % 2))
                    .map((item, index) => (
                      <li
                        key={index}
                        onClick={() => onClickItem(item)}
                        data-toggle="modal"
                        data-target="#detailModal"
                        className="list-group-item"
                      >
                        {item}
                      </li>
                    ))}
                </ul>
                {loading && <div>Loading...</div>}
              </Scrollbars>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary color-a"
                onClick={() => onClickAllData()}
              >
                All Contacts
              </button>
              <button
                type="button"
                className="btn btn-primary color-b"
                onClick={() => onClickUSData()}
              >
                US Contacts
              </button>
              <button
                type="button"
                className="btn btn-light color-c"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="detailModal"
        role="dialog"
        aria-labelledby="modalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Detail Information
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td scope="row">{contactData?.id}</td>
                  </tr>
                  <tr>
                    <td>First Name</td>
                    <td scope="row">{contactData?.first_name}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td scope="row">{contactData?.last_name}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td scope="row">{contactData?.phone_number}</td>
                  </tr>
                  <tr>
                    <td>Country Id</td>
                    <td scope="row">{contactData?.country_id}</td>
                  </tr>
                  <tr>
                    <td>Color</td>
                    <td scope="row">{contactData?.color}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light color-c"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map state and dispatch to props using connect
const mapStateToProps = (state: RootState) => ({
  data: state.contacts.data,
  page: state.contacts.page,
  loading: state.contacts.loading,
  error: state.contacts.error,
});

const mapDispatchToProps = {
  fetchData,
};

// Use the connect function with the type-safe props
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MainComponent);
