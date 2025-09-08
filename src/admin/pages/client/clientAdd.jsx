import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "../pageHeader";
import styles from "./clientAdd.module.css"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { clientSaveAction, getclientEditAction } from "@/lib/features/clientSlice";
import { ModifiedToast } from "@/components/toaster";

const ClientAdd = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { client, isLoading } = useAppSelector((state) => state.clientReducer);
    const { id } = useParams()
    let actionMethod = id ? 'PUT' : 'POST'

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getclientEditAction({ id }))
        }
    }, [])
    const handleClientSubmit = (event) => {
        let formName = 'clientAdd'
        event.preventDefault()
        const fd = new FormData(event.currentTarget)
        dispatch(clientSaveAction({ fd, actionMethod, formName, navigate, id }))

    }
    console.log(isLoading)
    return (
        <div className=" w-full min-h-screen py-6 md:px-10 px-3 bg-gray-200 ">
            <ModifiedToast />
            <PageHeader label={` Client ${client ? "Update" : "Add"}`} />
            <div className="card dark:bg-gray-700 bg-white md:p-8 p-4 mb-3">
                <div className="formArea mt-5">
                    <form onSubmit={handleClientSubmit} id="clientAdd">
                        {id ?
                            <input
                                name="id"
                                type="hidden"
                                defaultValue={client ? client.id : ""}
                            /> : ""}
                        <div className="flex lg:flex-nowrap	flex-wrap">
                            <div className="lg:w w-full ">
                                <div className="form-group mb-6  lg:pr-5">
                                    <label className="formLabel">Name *</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Enter client name "
                                        className="formControl"
                                        defaultValue={client ? client.name : ""}
                                        onChange={(e) => handlerChange(e)}
                                    />
                                    <div className="help-block">sfgsdfgsdfg</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:flex-nowrap	flex-wrap">
                            <div className="lg:w w-full ">
                                <div className="form-group mb-6  lg:pr-5">
                                    <label className="formLabel" htmlFor="description">Description *</label>
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Enter client description "
                                        className="formControlt"
                                        defaultValue={client ? client.description : ""}
                                        onChange={(e) => handlerChange(e)}
                                    />
                                    <div className="help-block"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-8">
                            <div className="form-group border-t pt-8 pb-3 flex ">
                                {/* <button
                                    onClick={() => window.location.href = '/'}
                                    className="btnPrimary"
                                >
                                    Go Home
                                </button> */}

                                <button
                                    type="submit"
                                    className={`btnPrimary ${isLoading && false ? styles.disabledSubmitLink : ""}`}
                                >
                                    {isLoading ?
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        : ""}
                                    {/* <span class="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span> */}
                                    <span className={`${isLoading ? "ml-2" : ""}`}> {`${isLoading ? "Loading ..." : "Submit"}`} </span>
                                </button>
                                {/* <button class="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md opacity-80">
                                        <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span class="ml-2">Loading...</span>
                                    </button> */}


                                <Link
                                    to={"/client/list"}
                                    className={`btnDanger ml-2 ${isLoading ? styles.disabledLink : ""}`}
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export const Component = ClientAdd