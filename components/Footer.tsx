'use client'
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import Link from 'next/link'
import profile from '@/public/json/personal_data.json'
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';


const Footer = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div className='w-full h-48 bg-slate-800 flex flex-col items-center justify-center gap-4 text-white'>
                <p>©{(new Date().getFullYear())} Thomas Moser</p>
                <ul className='flex gap-2'>
                    <li><Link href={profile.Repository} className='hover:text-orange-500'>Github</Link></li>
                    <li>|</li>
                    <li><Link href={'/services'} className='hover:text-orange-500'>Terms of Service</Link></li>
                    <li>|</li>
                    <li><div className='hover:text-orange-500 cursor-pointer' onClick={onOpen} >Contact</div></li>
                </ul>
            </div>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Contact</ModalHeader>
                            <ModalBody>
                            <div className='flex flex-col gap-2'>
                                <Link href={`${profile.Instagram}`} target='_blank' color='foreground' className='flex gap-4 px-4 py-3 items-center rounded-lg hover:bg-black/5 transition-all duration-300'>
                                    <FaInstagram size={24} />
                                    <span>Instagram</span>
                                </Link>
                                <Link href={`${profile.LinkedIn}`} target='_blank' color='foreground' className='flex gap-4 px-4 py-3 items-center rounded-lg hover:bg-black/5 transition-all duration-300'>
                                    <FaLinkedin size={24} />
                                    <span>LinkedIn</span>
                                </Link>  
                                <Link href={`mailto:${profile.Email}`} target='_blank' color='foreground' className='flex gap-4 px-4 py-3 items-center rounded-lg hover:bg-black/5 transition-all duration-300'>
                                    <MdEmail size={24} />
                                    <span>Email</span>
                                </Link>                               
                            </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default Footer