import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import './custom.css';

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();

  const [formData, setFormData] = useState({
  Github: "https://git.com/",
  firstName: "Valeria",
  lastName: "Salazar",
  email: "valeria@cesde.edu.co",
  phone: "+57 300 123 4567",
  bio: "Desarrollador frontend con pasión por el diseño y React.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving changes...", formData);
    closeModal();
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl bg-white shadow-lg dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-xl font-bold text-[--primary-color] lg:mb-6">Información Personal</h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 2xl:gap-x-24">
            <p className="text-sm font-medium text-gray-800">{formData.firstName}</p>
            <p className="text-sm font-medium text-gray-800">{formData.lastName}</p>
            <p className="text-sm font-medium text-gray-800">{formData.email}</p>
            <p className="text-sm font-medium text-gray-800">{formData.phone}</p>
            <p className="text-sm font-medium text-gray-800">{formData.bio}</p>
          </div>
        </div>

        <button
          onClick={openModal}
          className="btn-outline px-5 py-3 rounded-full transition duration-200"
        >
          ✎ Editar
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="w-full max-w-[700px] rounded-3xl bg-white p-6 dark:bg-gray-900 lg:p-10">
          <h4 className="text-2xl font-semibold text-[--primary-color] mb-2">Editar información personal</h4>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[450px] overflow-y-auto">
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="LinkedIn"
                value={formData.Github}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />

              <input
                type="text"
                id="bio"
                name="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col-reverse items-stretch gap-3 mt-6 lg:flex-row lg:justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="btn-outline px-4 py-2 rounded-md border border-gray-300"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="btn-primary px-4 py-2 rounded-md bg-[--primary-color] text-white"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}






