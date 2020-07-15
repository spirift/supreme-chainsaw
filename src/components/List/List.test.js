import React from 'react';
import { render, wait, act } from '@testing-library/react';
import List from './List'

jest.spyOn(window, 'fetch')

window.fetch.mockReturnValue({
  ok: true,
  json: () => [
    {
      "droneId": 1,
      "numFlights": 123,
      "name": "Retro Encabulator",
      "currency": "USD",
      "price": 100000,
      "numCrashes": 123
    },
]})

describe('List component', () => {


  describe('When there is a bad status code', () => {
    beforeEach(() => {
      window.fetch.mockReturnValueOnce({
        ok: false, 
        })    
    });
    it('handles all bad status codes by retrying', async () => {
      let component
      await act(async () => {

        component = render(<List />)
      })
      
      await wait(() => expect(component.getByText('Drones').parentNode.querySelectorAll('li').length).toEqual(1));
    });
    
  });

  describe('When there is a good status code', () => {
    it('should show a list of drones as returned from the API', async () => {
      const { getByText } = render(<List />)
      await wait(() => expect(getByText('Drones').parentNode.querySelectorAll('li').length).toEqual(1));
    });
    
    it('shows the name for each drone', async () => {
      
      const { getByText } = render(<List />)
      await wait(() => expect(getByText('Retro Encabulator')).toBeInTheDocument());
    });
    it('shows the cost for each drone', async () => {
      
      const { getByText } = render(<List />)
      await wait(() => expect(getByText('100000 USD')).toBeInTheDocument());
    });

    it('shows the number of flights', async () => {

      const { getByText } = render(<List />)
      await wait(() => expect(getByText('Flights: 123')).toBeInTheDocument());
    });
    it('shows the number of crashes', async () => {

      const { getByText } = render(<List />)
      await wait(() => expect(getByText('Crashes: 123')).toBeInTheDocument());
    });
  });
});