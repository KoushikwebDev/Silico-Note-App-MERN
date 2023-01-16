import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [userNote, setUserNote] = useState({
    title: "",
    note: "",
  });

  const titleRef = useRef();
  const noteRef = useRef();
  const updateBtnRef = useRef();
  const addBtnRef = useRef();
  const searchRef = useRef();
  const [showMsg, setShowMsg] = useState("");
  const [holdId, setholdId] = useState(0);
  const [Notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allNotes, setAllNote] = useState(Notes);
  const [userData, setUserData] = useState({});

  // Auth System 😎😎😎😎
  useEffect(() => {
    const onload = async () => {
      await fetchData();
      await fetchUserNotes();
    };
    onload();

    // eslint-disable-next-line
  }, [userData]);

  const fetchData = async () => {
    auth.onAuthStateChanged((user) => {
      setUserData(user);

      if (!user) {
        navigate("/login");
      }
    });
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      alert("Signout Successfull.");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const verifyEmail = async (e) => {
    e.preventDefault();
    try {
      let user = auth.currentUser;
      await sendEmailVerification(user);
      alert(
        "Email verifiaction mail send, if not found in primary mail box, check in spam"
      );
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  // handle all promise
  const handlePromise = async (promise) => {
    let data, err;
    try {
      data = await promise;
    } catch (error) {
      err = error.message;
    }
    return [data, err];
  };

  // adding note to Database
  const addNote = async (e) => {
    e.preventDefault();

    if (!(userNote.title && userNote.note && userData.email)) {
      setShowMsg("Please Add title and Note");
      setTimeout(() => {
        setShowMsg("");
      }, 2000);
      return;
    }

    const value = {
      title: userNote.title,
      note: userNote.note,
      email: userData.email,
    };

    const promise = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updatenote`,
      value
    );

    const [, err] = await handlePromise(promise);
    await fetchUserNotes();

    if (err) {
      setShowMsg(err);
      console.log(err);
      return;
    }
    setShowMsg("Note Added Sucessfully");

    setTimeout(() => {
      setShowMsg("");
    }, 2000);
    userNote.title = "";
    userNote.note = "";
  };

  // Fetching Data from Backend 😎😎😎

  const fetchUserNotes = async () => {
    console.log("fetch enter");
    if (!userData.email) {
      console.log("fetch if enter");
      return;
    }
    let promise = axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/notes/${userData.email}`
    );

    const [data, err] = await handlePromise(promise);

    if (err) {
      // alert(err);
      return;
    }
    // console.log(userData.email);
    // console.log(data);

    setNotes(data.data?.notes);
    setAllNote(data.data?.notes);
  };

  // edit method
  const editNote = async (title, note, id) => {
    titleRef.current.value = title;
    noteRef.current.value = note;
    setholdId(id);
    setUserNote({
      title: titleRef.current.value,
      note: noteRef.current.value,
    });
    // window.scrollTo(0, 0);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      titleRef.current.focus();
    }, 1000);
    updateBtnRef.current.style.display = "block";
    addBtnRef.current.style.display = "none";
  };

  // update method while editing
  const updateNote = async (e) => {
    e.preventDefault();

    const value = {
      title: userNote.title,
      note: userNote.note,
      email: userData.email,
    };

    let promise = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/editnote/${holdId}`,
      value
    );

    const [data, err] = await handlePromise(promise);
    await fetchUserNotes();

    if (err) {
      setShowMsg(err);

      setTimeout(() => {
        setShowMsg("");
      }, 4000);
    }
    if (data) {
      setShowMsg("Note Updated");

      updateBtnRef.current.style.display = "none";
      addBtnRef.current.style.display = "block";
      setTimeout(() => {
        setShowMsg("");
      }, 3000);
    }

    setUserNote({ title: "", note: "" });
  };

  // delete method
  const deleteNote = async (e, id) => {
    e.preventDefault();
    let wantToDelete = window.confirm("Are you sure ? want to delete it ?");
    if (!wantToDelete) {
      return;
    }
    let promise = axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deletenote/${userData.email}/${id}`
    );

    const [data, err] = await handlePromise(promise);
    if (data) {
      alert("Note deleted");
      fetchUserNotes();
    }
    if (err) {
      console.log(err);
      alert(err);
    }
  };

  // search method
  const searchNote = () => {
    let response = allNotes.filter((note) => {
      if (searchRef.current.value === "") {
        return allNotes;
      } else {
        return note.title
          .trim()
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase());
      }
    });

    return response;
  };
  return (
    <>
      <Navbar name={userData?.displayName} logout={logout} />

      {/* Dashboard */}
      <div className="px-5  sm:px-10 lg:px-24">
        <h1 className=" mt-2 sm:hidden font-semibold">
          Hello {userData?.displayName} Add Your Note
        </h1>
        {userData?.emailVerified ? (
          ""
        ) : (
          <NavLink
            className="text-red-600 sm:block sm:py-2 inline "
            onClick={verifyEmail}
          >
            Click here to verify your email
          </NavLink>
        )}
      </div>

      <div id="top" className="flex flex-col gap-2 px-5  sm:px-10 lg:px-24">
        <input
          ref={titleRef}
          name="title"
          type="text"
          placeholder="Title"
          className="border-2 border-blue-400 p-2 mt-3 font-semibold"
          value={userNote.title}
          onChange={(e) => setUserNote({ ...userNote, title: e.target.value })}
        />
        <textarea
          ref={noteRef}
          name="note"
          cols="30"
          rows="2"
          placeholder="Note"
          className="border-2 border-blue-400 p-2 font-medium"
          value={userNote.note}
          onChange={(e) => setUserNote({ ...userNote, note: e.target.value })}
        ></textarea>

        <h4 className=" font-semibold text-red-500">{showMsg}</h4>

        <button
          ref={addBtnRef}
          className="bg-blue-700 py-2 mt-2 text-white font-semibold"
          onClick={(e) => addNote(e)}
        >
          Add Note
        </button>

        <button
          ref={updateBtnRef}
          className="hidden bg-blue-700 py-2 mt-2 text-white font-semibold"
          onClick={(e) => updateNote(e)}
        >
          Update Note
        </button>
      </div>

      <div className="flex justify-between gap-4 px-5 mt-5  sm:px-10 lg:px-24">
        <input
          ref={searchRef}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            const filterNote = searchNote();
            setNotes(filterNote);
          }}
          name="title"
          type="text"
          placeholder="Search here"
          className="border-2 px-4 border-orange-400 w-full"
        />
        <button
          onClick={() => {
            const filterNote = searchNote();
            setNotes(filterNote);
          }}
          className="bg-[#FF6263] py-2 px-4 md:px-8 text-white font-semibold"
        >
          Search
        </button>
      </div>

      <div className="mt-5 px-5 sm:px-10 lg:px-24 pb-4">
        <h2 className="text-xl font-bold">Your Notes : </h2>
      </div>
      {Notes?.length ? (
        Notes.map((note, index) => {
          return (
            <div
              className="px-5 sm:px-10 lg:px-24 border-y-2 pt-5 pb-2 shadow-xl min-h-[120px]"
              key={note._id}
            >
              <div className="flex justify-between gap-3">
                <h3 className="text-lg text-blue-600 font-semibold leading-none">
                  {note.title}
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => editNote(note.title, note.note, note._id)}
                    className="bg-sky-600 h-[25px]  px-4  text-white font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => deleteNote(e, note._id)}
                    className="bg-red-600 h-[25px]  px-4  text-white font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-lg mb-3 text-[#0D0D0D] ">{note.note}</p>
              <span className="text-[7px] md:text-sm block md:inline-block mb-[-29px] md:mb-0  mr-3">
                <span className="text-blue-400">createdAt: </span>
                {new Date(note?.CreatedAt).toString()}
              </span>
              <br className="md:hidden" />
              <span className="text-[7px] md:text-sm ">
                <span className="text-blue-400">updatedAt: </span>
                {note.UpdatedAt
                  ? new Date(note?.UpdatedAt).toString()
                  : "Not Updated"}
              </span>
            </div>
          );
        })
      ) : (
        <h1 className="text-center font-semibold text-lg">Notes not found</h1>
      )}
    </>
  );
}

export default Dashboard;
