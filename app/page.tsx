'use client'
import React, { useState } from "react";
import { useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@nextui-org/react";
import { toast } from 'sonner';

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl }),
    });

    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
      onOpen();
      setLoading(false);
    } else {
      toast.error(data.error);
      alert(data.error);
    }
  };

  const onCopyTopClipboard = (e: any) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('URL copied to clipboard');
  }

  return (
    <div className="flex flex-col items-center justify-center p-24 min-h-screen">
      <h1 className="text-[64px] font-bold text-white z-10">URL Shortener</h1>

      <form onSubmit={handleSubmit} className="z-20 flex w-1/2 p-0">
        <input
          type="url"
          placeholder="Enter your URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          className="p-3 rounded-lg rounded-r-none w-full focus:outline-none"
          required
        />
        {loading ? (
          <div className="bg-transparent pl-2">
            <Spinner color="warning" />
          </div>
        ) : (
          <button type="submit" className={`bg-orange-500 text-white p-2 rounded rounded-l-none ${!longUrl ? 'opacity-100 bg-gray-400 cursor-not-allowed' : ''}`} disabled={!longUrl}>
            Shorten
          </button>
        )}
      </form>

      {shortUrl && (
        <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Your URL shortened</ModalHeader>
                <ModalBody>
                  <div className='flex flex-col gap-2'>
                    {shortUrl}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onCopyTopClipboard}>Copy URL</Button>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}