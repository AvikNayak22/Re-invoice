// Importing necessary dependencies and modules from external libraries
import React, { createContext, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";

// Create a React context to manage the state
const StateContext = createContext();

// Defining a provider component that will wrap the application and provide state to its children
const StateProvider = ({ children }) => {
  
  // State variables to manage various form and invoice-related data
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Ref for referencing a component in the DOM
  const componentRef = useRef();

   // Function to handle printing
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Form submission function
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validation check for form inputs
      if (!description || !quantity || !price) {
        toast.error("Please fill in all inputs");
      } else {
        // Creating a new item with a unique ID using uuid
        const newItems = {
          id: uuidv4(),
          description,
          quantity,
          price,
          amount,
        };

        // Clearing input fields and updating the list of items
        setDescription("");
        setQuantity("");
        setPrice("");
        setAmount("");
        setList([...list, newItems]);
        setIsEditing(false);
        //console.log(list);
      }
    },
    [amount, description, list, price, quantity]
  );

  // Function to calculate the amount based on quantity and price
  useEffect(() => {
    const calculateAmount = () => {
      setAmount(quantity * price);
    };
    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Function to calculate the total amount of items in the table using collect.js
  const calculateTotal = () => {
    const allItems = list.map((item) => item.amount);
    setTotal(collect(allItems).sum());
  };

  useEffect(() => {
    calculateTotal();
  });

  // Function to edit a row in the table
  const editRow = useCallback(
    (id) => {
      const editingRow = list.find((row) => row.id === id);
      setList(list.filter((row) => row.id !== id));
      setIsEditing(true);
      setDescription(editingRow.description);
      setQuantity(editingRow.quantity);
      setPrice(editingRow.price);
    },
    [list]
  );

 // Function to delete a row in the table
  const deleteRow = useCallback(
    (id) => {
      setList(list.filter((row) => row.id !== id));
      setShowModal(false);
    },[list]);

  // Creating a context object with all the state variables and functions
  const context = useMemo(
    () => ({
      name,
      setName,
      address,
      setAddress,
      email,
      setEmail,
      phone,
      setPhone,
      bankName,
      setBankName,
      bankAccount,
      setBankAccount,
      website,
      setWebsite,
      clientName,
      setClientName,
      clientAddress,
      setClientAddress,
      invoiceNumber,
      setInvoiceNumber,
      invoiceDate,
      setInvoiceDate,
      dueDate,
      setDueDate,
      notes,
      setNotes,
      description,
      setDescription,
      quantity,
      setQuantity,
      price,
      setPrice,
      amount,
      setAmount,
      list,
      setList,
      total,
      setTotal,
      componentRef,
      handlePrint,
      isEditing,
      setIsEditing,
      showModal,
      setShowModal,
      handleSubmit,
      editRow,
      deleteRow,
    }),
    [
      name,
      setName,
      address,
      setAddress,
      email,
      setEmail,
      phone,
      setPhone,
      bankName,
      setBankName,
      bankAccount,
      setBankAccount,
      website,
      setWebsite,
      clientName,
      setClientName,
      clientAddress,
      setClientAddress,
      invoiceNumber,
      setInvoiceNumber,
      invoiceDate,
      setInvoiceDate,
      dueDate,
      setDueDate,
      notes,
      setNotes,
      description,
      setDescription,
      quantity,
      setQuantity,
      price,
      setPrice,
      amount,
      setAmount,
      list,
      setList,
      total,
      setTotal,
      componentRef,
      handlePrint,
      isEditing,
      setIsEditing,
      showModal,
      setShowModal,
      handleSubmit,
      editRow,
      deleteRow,
    ]
  );

  // Providing the context to the components in the tree
  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

// Exporting the context and provider for use in other parts of the application
export { StateContext, StateProvider };
