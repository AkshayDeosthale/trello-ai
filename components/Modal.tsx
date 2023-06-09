"use client";
import { useState, Fragment, useRef, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useModalStore from "@/store/ModalStore";
import useBoardStore from "@/store/BoardStore";
import TaskTyperadioGroup from "./TaskTyperadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";

function Modal() {
  const [isOpen, closeModal, openModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
    state.openModal,
  ]);

  const [addtask, newTaskInput, setNewTaskInput, image, setImage] =
    useBoardStore((state) => [
      state.addtask,
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
    ]);

  const imagePickerRef: any = useRef(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={closeModal}
      >
        {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 " />
        </Transition.Child>

        {/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center  ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 pb-2"
                  >
                    Add a task
                  </Dialog.Title>

                  <div className="mt-2">
                    <input
                      type="text"
                      value={newTaskInput}
                      onChange={(e) => setNewTaskInput(e.target.value)}
                      placeholder="Enter a Task Here..."
                      className="w-full border border-gray-300 rounded-md outline-none p-5"
                    />
                  </div>
                  <TaskTyperadioGroup />

                  <div>
                    <button
                      type="button"
                      onClick={(e) => {
                        imagePickerRef.current?.click();
                        e.preventDefault();
                      }}
                      className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                      Upload Image
                    </button>
                    {image && (
                      <Image
                        src={URL.createObjectURL(image)}
                        alt="upload"
                        width={200}
                        height={200}
                        className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                        onClick={() => setImage(null)}
                      />
                    )}
                    <input
                      type="file"
                      hidden
                      ref={imagePickerRef}
                      onChange={(e) => {
                        if (!e.target.files![0].type.startsWith("image/"))
                          return;
                        setImage(e.target.files![0]);
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={!newTaskInput}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100  disabled:text-gray-300 disabled:cursor-not-allowed  "
                    >
                      Add Task
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
