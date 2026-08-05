Approach:

1. Create an array of states.

   ```js
   const states = new Array(1000).fill(false);
   ```

2. Use a loop to generate 1000 checkboxes dynamically.

3. Give each checkbox a unique ID/index.

   ```html
   <input type="checkbox" data-id="0">
   ```

4. Attach a `change` event listener to each checkbox.

5. When a checkbox changes:

   * Update its state in the array.
   * Emit a Socket.IO event with:

     * checkbox ID
     * new checked value

6. On the server:

   * Receive the event.
   * Update the server's copy of the state.
   * Broadcast the change to all connected clients.

7. On every client:

   * Listen for the broadcast.
   * Find the checkbox by its ID.
   * Update its checked state.
