export const PassPopover = ({togglePopup}) => {
    return(
        <div data-popover id="popover-password" role="tooltip" class={`translate-y-16 absolute absolute z-10 ${togglePopup ? 'visible opacity-1' : "invisible opacity-0" } z-10 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72`}>
        <div class="p-3 space-y-2">
            <h3 class="font-semibold text-gray-900">Must have at least 8 characters</h3>
            <div class="grid grid-cols-4 gap-2">
                <div class="h-1 bg-orange-300 "></div>
                <div class="h-1 bg-orange-300 "></div>
                <div class="h-1 bg-gray-200"></div>
                <div class="h-1 bg-gray-200"></div>
            </div>
            <p>It’s better to have:</p>
            <ul>
                <li class="flex items-center mb-1">
                    <svg class="w-3.5 h-3.5 me-2 text-green-400 dark:text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                    </svg>
                    Upper & lower case letters
                </li>
                <li class="flex items-center mb-1">
                    <svg class="w-3 h-3 me-2.5 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    A symbol (#$&)
                </li>
                <li class="flex items-center">
                    <svg class="w-3 h-3 me-2.5 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    A longer password (min. 12 chars.)
                </li>
            </ul>
            </div>
            <div data-popper-arrow></div>
          </div>
    )
}