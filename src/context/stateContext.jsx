import {
  createContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";

const StateContext = createContext();

const StateProvider = ({ children }) => {
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
  const componentRef = useRef();

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Submit form function
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!description || !quantity || !price) {
        toast.error("Please fill in all inputs");
      } else {
        const newItems = {
          id: uuidv4(),
          description,
          quantity,
          price,
          amount,
        };
        setDescription("");
        setQuantity("");
        setPrice("");
        setAmount("");
        setList([...list, newItems]);
        setIsEditing(false);
        console.log(list);
      }
    },
    [amount, description, list, price, quantity]
  );

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = () => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Use collect.js to calculate the total amount of items in the table.
  const calculateTotal = () => {
    const allItems = list.map((item) => item.amount);

    setTotal(collect(allItems).sum());
  };

  useEffect(() => {
    calculateTotal();
  });

  // Edit function
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

  // Delete function
  const deleteRow = useCallback(
    (id) => {
      setList(list.filter((row) => row.id !== id));
      setShowModal(false);
    },
    [list]
  );

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

  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};

export { StateContext, StateProvider };
