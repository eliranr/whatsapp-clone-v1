
export default function Contacts({contacts}) {
  return (
    <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
      {contacts.map((contact) => (
        <li className="flex flex-row items-center px-2 py-2 h-[52px] hover:bg-green-100 space-x-2  cursor-pointer">
            <div class="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <img className="w-8 rounded-full" src="https://st4.depositphotos.com/11634452/21365/v/600/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg" />
                <label for="checkbox-item-11" class="py-2 ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{contact.name}</label>
            </div>
        </li>
      ))}
    </ul>
  )
}
